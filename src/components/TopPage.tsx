import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, Stack, Text, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const TopPage: React.FC = () => {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
//  React Routerのフック
// プログラム的にページ遷移を行う関数を提供
// コンポーネント内で、navigate('/path')で任意のページに遷移可能
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      setError("IDは必須です");
    } else {
      setError("");
      navigate(`/cards/${id}`);
    }
  };

  const handleNavigate = () => {
    navigate("/cards/register");
  };

  return (
    <>
      <Text fontWeight="bold" fontSize="xl" mb={4} textAlign="center">
        デジタル名刺アプリ
      </Text>
      <Box maxW="md" mx="auto" mt={4} p={4} borderWidth={1} borderRadius="lg">
        <form onSubmit={handleSubmit}>
          <Stack>
            <Box>
              <label
                htmlFor="id"
                style={{ textAlign: "left", display: "block" }}
              >
                <Text>ID:</Text>
              </label>
              <Input
                type="text"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </Box>
            {error && (
              <Text color="red.500" textAlign="left">
                {error}
              </Text>
            )}
            <Button
              type="submit"
              width="100%"
              bg="var(--chakra-colors-teal-500)"
              color="white"
              _hover={{ bg: "var(--chakra-colors-teal-600)" }}
            >
              名刺をみる
            </Button>
          </Stack>
        </form>
      </Box>

      <Link onClick={handleNavigate} mt={4}>
        登録ページへ
      </Link>
    </>
  );
};

export default TopPage;
