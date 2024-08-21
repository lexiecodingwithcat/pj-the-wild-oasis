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
// we also need to pass editID so that we will know if we are in the editSession
export async function createEditCabin(newCabin, id) {
  //if the imagePatgh caontains supabase as its prefix, it means we are editting the cabin
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //to make sure each image name is unique, we create random prefix for them
  //because if there is "/" supdabase will create a new folder
  // so we need to prevent that by replacing "/" with ""
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  //then we create URL to store it inside the cabin row if there is no imagePath
  // if there is an imagePath, just keep it
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1.create/edit new cabin to save the data into DB
  let query = supabase.from("cabins");
  //A) CREATE
  if (!id) {
    //an array basically is a row
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  //B) EDIT
  if (id) {
    query = query
      //we pass an object instead of array because we have selected this row using id
      .update({ ...newCabin, image: imagePath })
      // we only update when the field id is equal to in id passed in
      .eq("id", id);
  }
  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //2. if the cabin has been created successfully, we upload the image
  //upload image only when there is no imagePath
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image, {
      cacheControl: "3600",
      upsert: false,
    });

  //3. delete the cabin IF there was an error uploading the corresponding image
  if (storageError) {
    //we need to use data.id because newCabin does not have this value
    //the id is the PK generated in DB
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created"
    );
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
