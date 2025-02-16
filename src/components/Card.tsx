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
import { fetchUser, fetchUserSkills } from "@/lib/supabaseOperations";

interface Skill {
  id: number;
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
      if (!id) {
        setError("ユーザーIDが見つかりません");
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const result = await fetchUser(id);
        const fetchedUser = User.create(
          result.name,
          result.description,
          result.github_id,
          result.qiita_id,
          result.x_id,
          skills.map((skill) => skill.name) // スキル名の配列を渡す
        );
        setData([fetchedUser]); // 配列として設定
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("ユーザーの取得に失敗しました。後ほど再試行してください。");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, skills]);

  useEffect(() => {
    const fetchSkills = async () => {
      if (!id) {
        setError("ユーザーIDが見つかりません");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchUserSkills(id);
        setSkills(data || []);
      } catch (error) {
        console.error("Error fetching user skills:", error);
        setError("スキルの取得に失敗しました。後ほど再試行してください。");
      } finally {
        setLoading(false);
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
                      <Icon
                        as={FaGithub}
                        w={6}
                        h={6}
                        data-testid="github-icon"
                      />
                    </Link>
                  )}
                  {item.qiitaId && (
                    <Link
                      href={item.qiitaId}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon as={SiQiita} w={6} h={6} data-testid="qiita-icon" />
                    </Link>
                  )}
                  {item.xId && (
                    <Link
                      href={item.xId}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon as={FaTwitter} w={6} h={6} data-testid="x-icon" />
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
              data-testid="back-button"
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
              data-testid="back-button"
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
