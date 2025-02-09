import { useParams } from "react-router-dom";
import React, { useEffect, useState, Fragment } from "react";
import supabase from "../../supabase";
import {
  Box,
  Heading,
  Stack,
  Spinner,
  Text,
  Link,
  List,
  Icon,
  HStack,
  Button,
} from "@chakra-ui/react";
// import User, { UserData } from '../models/User';
import User from "../models/User";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { SiQiita } from "react-icons/si";
import { useNavigate } from "react-router-dom";

interface Skill {
  id: string;
  name: string;
}

const Card: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<User[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", id)
        .single();

      if (error) {
        // console.log("Error fetching user:", error);
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

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      {data.length > 0 ? (
        data.map((item, index) => (
          <Fragment key={index}>
            <Box
              maxW="3xl" //最大幅を指定する方法がうまく行かない
              mx="auto"
              mt={8}
              p={4}
              borderWidth={1}
              borderRadius="lg"
            >
              <Heading as="h2" size="md" mb={2} data-testid="name-text">
                {item.name}
              </Heading>
              <Box mb={2} textAlign="left">
                <Text fontSize="sm">自己紹介</Text>
                {/* htmlを直接書くためのコード */}
                {/* <Box fontSize="sm" dangerouslySetInnerHTML={{ __html: item.introduction }} /> */}
                <Text fontSize="sm" data-testid="introduction-text">
                  {item.introduction}
                </Text>
              </Box>
              <Box
                mb={2}
                textAlign="left"
                display="flex"
                justifyContent="center"
              >
                スキル：
                <List.Root as="ol">
                  {skills.map((skill, skillIndex) => (
                    <List.Item key={skillIndex} data-testid="skill">
                      {skill.name}
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
              <Box
                mb={2}
                textAlign="left"
                display="flex"
                justifyContent="center"
              >
                <HStack mt={4} gap={4}>
                  {item.githubId && (
                    <Link
                      href={item.githubId}
                      target="_blank"
                      // セキュリティとプライバシーのために、リンク先のページが window.opener にアクセスできないようにし、リファラ情報を送信しないようにする
                      rel="noopener noreferrer"
                    >
                      <Icon as={FaGithub} w={6} h={6} />
                    </Link>
                  )}
                  {item.qiitaId && (
                    <Link
                      href={item.qiitaId}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon as={SiQiita} w={6} h={6} />
                    </Link>
                  )}
                  {item.xId && (
                    <Link
                      href={item.xId}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon as={FaTwitter} w={6} h={6} />
                    </Link>
                  )}
                </HStack>
              </Box>
            </Box>
            <Button
              mt={4}
              onClick={handleBack}
              width="60%"
              bg="var(--chakra-colors-teal-500)"
              color="white"
              _hover={{ bg: "var(--chakra-colors-teal-600)" }}
            >
              戻る
            </Button>
          </Fragment>
        ))
      ) : (
        <>
          <Text color="red.500" fontSize="lg">
            IDがありません: {id}
          </Text>

          <Box display="flex" justifyContent="center" width="100%">
            <Button
              mt={4}
              onClick={handleBack}
              width="60%"
              bg="var(--chakra-colors-teal-500)"
              color="white"
              _hover={{ bg: "var(--chakra-colors-teal-600)" }}
            >
              戻る
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default Card;
