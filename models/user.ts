import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email aready exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    unique: [true, 'Username aready exists!'],
    match: [
      /^.{6,}$/,
      'Username is invalid. Must have minimum 6 characters and must be unique',
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model('User', UserSchema);

export default User;
