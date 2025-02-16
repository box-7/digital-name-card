import supabase from "../../supabase";

interface Skill {
  id: number;
  name: string;
}

interface User {
  user_id: string;
  name: string;
  description: string;
  github_id: string;
  qiita_id: string;
  x_id: string;
}

interface UserSkill {
  user_id: string;
  skill_id: number;
}

export const getSkills = async (): Promise<Skill[]> => {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .returns<Skill[]>();

  if (error) {
    throw new Error(`Error fetching skills: ${error.message}`);
  }

  if (!data) {
    throw new Error("No data returned");
  }
  return data;
};

export const insertUsers = async (user: User): Promise<void> => {
  const { error } = await supabase.from("users").insert([
    {
      user_id: user.user_id,
      name: user.name,
      description: user.description,
      github_id: user.github_id,
      qiita_id: user.qiita_id,
      x_id: user.x_id,
    },
  ]);

  if (error) {
    throw new Error(`Error inserting user: ${error.message}`);
  }
};

export const insertUserSkill = async (userSkill: UserSkill): Promise<void> => {
  const { error } = await supabase.from("user_skill").insert([
    {
      user_id: userSkill.user_id,
      skill_id: userSkill.skill_id,
    },
  ]);

  if (error) {
    throw new Error(`Error inserting user_skill: ${error.message}`);
  }
};
