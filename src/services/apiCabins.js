import supabase, { supabaseUrl } from "./supabase";

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
  //to make sure each image name is unique, we create random prefix for them
  //because if there is "/" supdabase will create a new folder
  // so we need to prevent that by replacing "/" with ""
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  //then we create URL to store it inside the cabin row
  //https://umwgqlsbzxfpbimlmorc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1.create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{...newCabin, image:imagePath}])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  //2. if the cabin has been created successfully, we upload the image
  //we need to specify the image path: the path including image name so that we can connect it with the row

  return data;
}

export async function deleteCabins(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
