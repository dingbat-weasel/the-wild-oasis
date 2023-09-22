import supabase from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createCabin(newCabin) {
  const { data, error } = await supabase
    .from('cabins')
    // array with obj
    // { some_column: 'someValue', other_column: 'otherValue' }
    // 'newCabin' prop works because our form values match the column names in our db
    .insert([newCabin])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
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
