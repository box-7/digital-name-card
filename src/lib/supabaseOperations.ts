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

export const fetchUser = async (id: string): Promise<User> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", id)
    .single();

  if (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }

  if (!data) {
    throw new Error("No data returned");
  }

  return data;
};

export const fetchUserSkills = async (userId: string): Promise<Skill[]> => {
  try {
    const { data: userSkills, error: userSkillsError } = await supabase
      .from("user_skill")
      .select("skill_id")
      .eq("user_id", userId);

    if (userSkillsError) {
      console.error(`Error fetching user skills: ${userSkillsError.message}`);
      throw new Error(`Error fetching user skills: ${userSkillsError.message}`);
    }

    if (!userSkills || userSkills.length === 0) {
      return []; // スキルがない場合は空の配列を返す
    }

    const skillIds = userSkills.map((us) => us.skill_id);

    // skill テーブルから skill_id に一致するスキルの詳細を取得
    const { data: skillsData, error: skillsError } = await supabase
      .from("skill")
      .select("*")
      .in("id", skillIds);

    if (skillsError) {
      console.error(`Error fetching skills: ${skillsError.message}`);
      throw new Error(`Error fetching skills: ${skillsError.message}`);
    }

    if (!skillsData) {
      return []; // データがない場合は空の配列を返す
    }

    return skillsData.map((skill) => ({
      id: skill.id,
      name: skill.name,
    }));
  } catch (error) {
    console.error("An error occurred:", error);
    // エラーが発生した場合でも特定の値をログに出力
    console.log("userId:", userId);
    return []; // エラーが発生した場合は空の配列を返す
  }
};
