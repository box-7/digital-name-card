// import React from 'react';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import supabase from "../../supabase";
import { Button, Stack, Theme, Spinner, Box } from "@chakra-ui/react";

interface DataItem {
  id: string;
  name: string;
  description: string;
  github_id: string;
  qiita_id: string;
  x_id: string;
  user_id: string;
  // [key: string]: any; // 他のプロパティを許容
}

interface Skill {
  id: string;
  name: string;
  // description: string;
}

// interface UserSkill {
//         user_id: string;
//         skill_id: string;
// }

const Card: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<DataItem[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // ローディング状態を管理するステート

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // データフェッチ開始時にローディングを開始
      const { data, error } = await supabase.from("users").select("*");

      if (error) {
        setError(error.message);
      } else {
        setData(data);
      }
      setLoading(false); // データフェッチ完了時にローディングを終了
    };

    fetchData();
  }, [id]);

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

        console.log("userSkills", userSkills);

        if (userSkills && userSkills.length > 0) {
          // userSkillsから、skill_idのリストを取得
          const skillIds = userSkills.map((us) => us.skill_id);
          // skillテーブルからskill_idと一致するnameを取得
          // .in('id', skillIds)は、Supabaseのクエリメソッドの一つ // SQLのIN句に相当
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

  // URLのidと一致するデータをフィルタリング
  const filteredData = data.filter((item) => item.user_id === id);
  //   console.log("filteredData", filteredData);

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
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div key={index}>
              <p>名前：{item.name}</p>
              <h1>自己紹介：{item.description}</h1>
              {/* <p>スキル：一旦空</p> */}
              <ul>
                {skills.map((skill, skillIndex) => (
                  <li key={skillIndex}>
                    <p>スキル： {skill.name}</p>
                  </li>
                ))}
              </ul>
              <p>GitHub：{item.github_id}</p>
              <p>Qiita：{item.qiita_id}</p>
              <p>X：{item.x_id}</p>
            </div>
          ))
        ) : (
          <p>No data found for ID: {id}</p>
        )}
      </Stack>
    </div>
  );

  //         const [data, setData] = useState<any[]>([])
  //         const [error, setError] = useState<string | null>(null)

  //         useEffect(() => {
  //           const fetchData = async () => {
  //             const { data, error } = await supabase
  //               .from('users')
  //               .select('*')

  //             if (error) {
  //               setError(error.message)
  //             } else {
  //               setData(data)
  //             }
  //           }

  //           fetchData()
  //         }, [])
  //   const { id } = useParams<{ id: string }>();
  //   return (
  //     <div>
  //       <h1>Card ID: {id}</h1>
  //       <Stack align="flex-start">
  //         {data.map((item, index) => (
  //           <div key={index}>{JSON.stringify(item)}</div>
  //         ))}
  //       </Stack>
  //     </div>
  //   );
};

export default Card;
