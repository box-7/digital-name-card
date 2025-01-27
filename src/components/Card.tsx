import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import supabase from "../../supabase";
import { Button, Stack, Theme, Spinner, Box } from "@chakra-ui/react";
// import User, { UserData } from '../models/User';
import User from "../models/User";

interface Skill {
  id: string;
  name: string;
  // description: string;
}

const Card: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const [data, setData] = useState<DataItem[]>([]);
  const [data, setData] = useState<User[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", id)
        .single();

      if (error) {
        setError(error.message);
      } else if (data) {
        // User.createを使用する場合
        const fetchedUser = User.create(
          data.name,
          data.description,
          data.github_id,
          data.qiita_id,
          data.x_id,
          skills.map((skill) => skill.name) // スキル名の配列を渡す
        );
        setData([fetchedUser]); // 配列として設定
      }
      setLoading(false);
    };

    fetchData();
  }, [id, skills]); // skillsを依存配列に追加

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        // 中間テーブル user_skillテーブルからuser_idと一致するskill_idを取得
        const { data: userSkills, error: userSkillsError } = await supabase
          .from("user_skill")
          .select("skill_id")
          .eq("user_id", id);

        if (userSkillsError) {
          throw userSkillsError;
        }

        if (userSkills && userSkills.length > 0) {
          // userSkillsから、skill_idのリストを取得
          const skillIds = userSkills.map((us) => us.skill_id);
          // skillテーブルからskill_idと一致するnameを取得
          // .in('id', skillIds)は、Supabaseのクエリメソッドの一つ  SQLのIN句に相当
          // 指定したカラム（この場合はid）が指定した値のリスト（skillIds）のいずれかに一致するレコードをフィルタリングする
          const { data: skillsData, error: skillsError } = await supabase
            .from("skill")
            .select("*")
            .in("id", skillIds);

          if (skillsError) {
            throw skillsError;
          }

          setSkills(skillsData || []);
        } else {
          setSkills([]);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };
    fetchSkills();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <div>
      <h1>Card ID: {id}</h1>
      {error && <p>Error: {error}</p>}
      <Stack align="flex-start">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index}>
              <p>名前：{item.name}</p>
              <h1>自己紹介：{item.introduction}</h1>
              {/* 要コメントアウト  <p>スキル：一旦空</p> */}
              <ul>
                {skills.map((skill, skillIndex) => (
                  <li key={skillIndex}>
                    <p>スキル： {skill.name}</p>
                  </li>
                ))}
              </ul>

              <p>
                GitHub：
                <a href={item.githubId} target="_blank" rel="noopener noreferrer">
                  {item.githubId}
                </a>
              </p>
              <p>
                Qiita：
                <a href={item.qiitaId} target="_blank" rel="noopener noreferrer">
                  {item.qiitaId}
                </a>
              </p>
              <p>
                X：
                <a href={item.xId} target="_blank" rel="noopener noreferrer">
                  {item.xId}
                </a>
              </p>
            </div>
          ))
        ) : (
          <p>No data found for ID: {id}</p>
        )}
      </Stack>
    </div>
  );
};

export default Card;
