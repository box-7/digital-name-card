import supabase from "../supabase";

export const deleteUsers = async (): Promise<void> => {
  const { error } = await supabase.from("users").delete().neq("user_id", "");
// Supabaseのセキュリティ機能により、WHERE句なしのDELETE文は制限されているためNG
// const { error } = await supabase.from("users").delete();

  if (error) {
    throw new Error(`Error deleting users: ${error.message}`);
  }
};

export const deleteUserSkill = async (): Promise<void> => {
  // テーブルのPKはidなので、idカラムは通常、空文字列("")になることはないのでNG
  const { error } = await supabase.from("user_skill").delete().neq("user_id", "");


  if (error) {
    throw new Error(`Error deleting user_skill: ${error.message}`);
  }
};

export const deleteAll = async (): Promise<void> => {
  await deleteUsers();
  await deleteUserSkill();
};

deleteAll().catch((error) => {
  console.error("Error executing deleteAll:", error);
});
