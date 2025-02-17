
import supabase from "../supabase";

export const deleteUsers = async (): Promise<void> => {
  const { error } = await supabase.from("users").delete();

  if (error) {
    throw new Error(`Error deleting users: ${error.message}`);
  }
};

export const deleteUserSkill = async (): Promise<void> => {
  const { error } = await supabase.from("user_skill").delete();

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
