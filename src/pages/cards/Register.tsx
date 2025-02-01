import React, { useState, useEffect } from "react";
import supabase from "../../../supabase";
import {
        // Box,
        Button,
        // FormControl,
        // FormLabel,
        Input,
        // Select,
        Textarea,
        Stack,
        // SelectItem,
} from "@chakra-ui/react";
import {
        NativeSelectField,
        NativeSelectRoot,
        // NativeSelectItem,
} from "@/components/ui/native-select";

import { Fieldset } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

interface Skill {
        id: number;
        name: string;
}

const Register: React.FC = () => {
        // Skillを型定義
        const [skills, setSkills] = useState<Skill[]>([]);
        const [formData, setFormData] = useState({
                id: "",
                name: '',
                description: '',
                github_id: '',
                qiita_id: '',
                x_id: '',
                favoriteSkill: '',
        });

        // console.log("skills", skills);
        useEffect(() => {
                const fetchSkills = async () => {
                        const { data, error } = await supabase.from("skill").select("*");
                        if (error) {
                                console.error("Error fetching skills:", error);
                        } else {
                                setSkills(data);
                        }
                };

                fetchSkills();
        }, []);

        const handleChange = (
                e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
                >
        ) => {
                const { name, value } = e.target;
                setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = (e: React.FormEvent) => {
                e.preventDefault();
                // 登録処理を実装
                console.log("User registered:", formData);
        };

        return (
                <form onSubmit={handleSubmit}>
                        <Fieldset.Root size="lg" maxW="md" onSubmit={handleSubmit}>
                                <Stack>
                                        <Fieldset.Legend>名刺新規登録</Fieldset.Legend>
                                </Stack>

                                <Fieldset.Content>
                                        <Field label="好きな英単語 *">

                                                <Input type="text" name="id" value={formData.id} onChange={handleChange} />
                                        </Field>

                                        <Field label="お名前 *">
                                                <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                                        </Field>

                                        <Field label="自己紹介 *">
                                                <Textarea name="description" value={formData.description} onChange={handleChange}
                                                        width="100%" // 幅を100%に設定
                                                        height="100px" // 高さを200pxに設定
                                                />
                                        </Field>

                                        <Field label="好きな技術 *">
                                                <NativeSelectRoot>
                                                        {/* value プロパティを設定して、選択された値が formData.favoriteSkill にバインドされるようにする */}
                                                        <NativeSelectField name="favoriteSkill" value={formData.favoriteSkill} onChange={handleChange} placeholder="選択してください">
                                                                {skills.map((skill) => (
                                                                        //  各 <option> 要素に key プロパティと value プロパティを設定することにより、選択肢の値が正しく設定される
                                                                        <option key={skill.id} value={skill.id}>
                                                                                {skill.name}
                                                                        </option>
                                                                ))}
                                                        </NativeSelectField>
                                                </NativeSelectRoot>
                                        </Field>
                                </Fieldset.Content>

                                <Field label="GitHub ID">
                                        <Input type="text" name="github_id" value={formData.github_id} onChange={handleChange} />
                                </Field>

                                <Field label="Qiita ID">
                                        <Input type="text" name="qiita_id" value={formData.qiita_id} onChange={handleChange} />
                                </Field>

                                <Field label="X ID">
                                        <Input type="text" name="x_id" value={formData.x_id} onChange={handleChange} />
                                </Field>

                                <Button type="submit" variant="surface" colorPalette="teal" size="sm">
                                        登録
                                </Button>
                        </Fieldset.Root>
                </form>
        );
};

export default Register;
