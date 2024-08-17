import supabase from "./supabase";

//function that will select all cabins
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    //this won't interaup the run of the program
    //it will just print the error to the console
    console.error(error);
    //stop the program
    throw new Error("Cabin could not be loaded");
  }
  return data;
}

export async function createCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  return data;
}

export async function deleteCabins(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
