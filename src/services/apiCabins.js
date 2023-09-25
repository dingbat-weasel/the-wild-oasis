import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);

  // There are two form states for images, if we are editing the cabin and do not provide an image, the obj will return only the URL of the supabase storage path (which we check for here), if we upload a new image it will return with that image file
  // Optional chaining in case its not a string
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  // Here we can use new image upload or not depending on form input
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create / Edit cabin

  // This is common technique when we want to reuse parts of the query
  // Originally looks like:
  /*
    const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();
  */
  let query = supabase.from('cabins');

  // A. CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // array with obj
  // { some_column: 'someValue', other_column: 'otherValue' }
  // 'newCabin' prop works because our form values match the column names in our db
  // This insert function will not immediately return the row, sometimes we need this; attach .select().single()

  // B. EDIT
  // Notice update obj does not get put in array like we do when inserting row above
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  // query data
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  // 2. Upload Image only if no error in creating cabin itself
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);
  if (storageError) {
    // Handle error
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(error);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }

  return data;
}
