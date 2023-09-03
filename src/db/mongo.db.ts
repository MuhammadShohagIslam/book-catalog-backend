import mongoose from 'mongoose';


export const database_connection = async (uri: string) => {
  try {
    if (!uri) {
      console.log('mongo uri is not find!');
    }
    await mongoose.connect(uri);
    console.log('mongodb database is running!');
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
