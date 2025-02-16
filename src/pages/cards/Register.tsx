import React, { useState, useEffect } from "react";
import supabase from "../../../supabase";
import { Box, Button, Input, Textarea, Stack, Text } from "@chakra-ui/react";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";

import { Fieldset } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  getSkills,
  insertUsers,
  insertUserSkill,
} from "../../lib/supabaseOperations";

interface Skill {
  id: number;
  name: string;
}

interface FormData {
  user_id: string; // id プロパティを追加
  name: string;
  description: string;
  github_id: string;
  qiita_id: string;
  x_id: string;
  favoriteSkill: string;
}

const Register: React.FC = () => {
  // Skillを型定義
  const [skills, setSkills] = useState<Skill[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      user_id: "",
      name: "",
      description: "",
      github_id: "",
      qiita_id: "",
      x_id: "",
      favoriteSkill: "",
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
        alert("スキルの取得に失敗しました。後ほど再試行してください。");
      }
    };
    fetchSkills();
  }, []);

  const onSubmit = async (data: FormData) => {
    console.log("User registered----------------------:", data);
    try {
      try {
        await insertUsers({
          user_id: data.user_id,
          name: data.name,
          description: data.description,
          github_id: data.github_id,
          qiita_id: data.qiita_id,
          x_id: data.x_id,
        });
      } catch (error) {
        console.error("Error inserting user:", error);
        alert("ユーザーの登録に失敗しました。後ほど再試行してください。");
      }

      try {
        await insertUserSkill({
          user_id: data.user_id,
          skill_id: Number(data.favoriteSkill),
        });
        navigate("/");
      } catch (error) {
        console.error("Error inserting user_skill:", error);
        alert("ユーザースキルの登録に失敗しました。後ほど再試行してください。");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("ユーザー登録に失敗しました。後ほど再試行してください。");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <Text fontWeight="bold" fontSize="xl" mb={4} textAlign="center">
        名刺新規登録
      </Text>
      <Box
        maxW={{ base: "100%", md: "md" }}
        mx="auto"
        p={4}
        borderWidth={1}
        borderRadius="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <Fieldset.Root size="lg" maxW="md" onSubmit={handleSubmit}> onSubmit={handleSubmit}> は不要のはず */}
          <Fieldset.Root size="lg" maxW="md" invalid>
            <Stack>
              {/* <Fieldset.Legend fontWeight="bold">名刺新規登録</Fieldset.Legend> */}
            </Stack>

            <Fieldset.Content>
              <Field label="好きな英単語 *">
                {/* type="text"
                                                        入力フィールドのタイプをテキスト入力に設定
                                                        ユーザーがテキストを入力できるフィールドを提供
                                                name="id"
                                                        入力フィールドの名前属性を設定
                                                        フォームデータを送信するときに、この名前属性がキーとして使用される
                                                        フォームの状態管理やバリデーションの際に、フィールドを識別するために使用
                                                value={formData.id}
                                                        入力フィールドの現在の値を設定
                                                        フォームの状態を反映し、入力フィールドの値を制御
                                                        formData.id は、コンポーネントの状態（formData）から取得
                                                onChange={handleChange}
                                                        入力フィールドの値が変更されたときに呼び出されるイベントハンドラを設定
                                                        ユーザーが入力フィールドに文字を入力するたびに、この関数が呼び出され、入力値が更新される
                                                        通常、handleChange 関数は入力フィールドの値を状態（formData）に反映させるために使用 */}
                {/* <Input type="text" name="id" value={ormData.id} onChange={handleChange} /> */}
                <Input
                  type="text"
                  {...register("user_id", {
                    required: "User IDは必須入力です。",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "IDは英語文字列のみです。",
                    },
                  })}
                />
                {errors.user_id && (
                  <Text color="red.500">{errors.user_id.message}</Text>
                )}
              </Field>

              <Field label="お名前 *">
                <Input
                  type="text"
                  {...register("name", {
                    required: "お名前は必須入力です。",
                    maxLength: {
                      value: 20,
                      message: "お名前は20文字以内にしてください。",
                    },
                  })}
                />
                {errors.name && (
                  <Text color="red.500">{errors.name.message}</Text>
                )}
              </Field>

              <Field label="自己紹介 *">
                <Textarea
                  {...register("description", {
                    required: "自己紹介は必須入力です。",
                    maxLength: {
                      value: 50,
                      message: "自己紹介は50文字以内にしてください。",
                    },
                  })}
                  width="100%"
                  height="100px"
                />
                {errors.description && (
                  <Text color="red.500">{errors.description.message}</Text>
                )}
              </Field>

              <Field label="好きな技術 *">
                <NativeSelectRoot>
                  {/* value プロパティを設定して、選択された値が formData.favoriteSkill にバインドされるようにする */}
                  <NativeSelectField
                    {...register("favoriteSkill", {
                      required: "好きな技術は必須入力です。",
                    })}
                    placeholder="選択してください"
                    data-testid="favorite-skill-select" // ここに data-testid を追加
                  >
                    {skills.map((skill) => (
                      <option key={skill.id} value={skill.id}>
                        {skill.name}
                      </option>
                    ))}
                  </NativeSelectField>
                </NativeSelectRoot>
                {errors.favoriteSkill && (
                  <Text color="red.500">{errors.favoriteSkill.message}</Text>
                )}
              </Field>
            </Fieldset.Content>

            <Field label="GitHub ID">
              <Input type="text" {...register("github_id")} />
            </Field>

            <Field label="Qiita ID">
              <Input type="text" {...register("qiita_id")} />
            </Field>

            <Field label="X ID">
              <Input type="text" {...register("x_id")} />
            </Field>

            <Text> *は必須項目です</Text>

            <Button
              type="submit"
              variant="solid"
              bg="blue"
              size="sm"
              data-testid="register-button"
            >
              登録
            </Button>
          </Fieldset.Root>
        </form>
      </Box>
      <Button
        mt={4}
        onClick={handleBack}
        width="60%"
        bg="var(--chakra-colors-teal-500)"
        color="white"
        _hover={{ bg: "var(--chakra-colors-teal-600)" }}
        data-testid="back-button-register"
      >
        戻る
      </Button>
    </>
  );
};

export default Register;
