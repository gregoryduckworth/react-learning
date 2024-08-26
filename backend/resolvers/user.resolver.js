import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

const userResolver = {
  Query: {
    authUser: async (_, __, { getUser }) => {
      try {
        const user = await getUser();
        return user;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
  Mutation: {
    signUp: async (_, { input }, { login }) => {
      try {
        const { username, name, password, gender } = input;

        if (!username || !name || !password || !gender) {
          throw new Error('All fields are required');
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error('Username already taken');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const profilePicture = `https://avatar.iran.liara.run/username?username=${username}`;

        const user = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture,
        });

        await user.save();
        await login(user);

        return user;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    login: async (_, { input }, { authenticate, login }) => {
      try {
        const { username, password } = input;
        const { user } = await authenticate('graphql-local', {
          username,
          password,
        });

        await login(user);
        return user;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    logout: async (_, __, { req, res, logout }) => {
      try {
        await logout();
        req.session.destroy((err) => {
          if (err) {
            throw err;
          }
        });
        res.clearCookie('connect.sid');

        return { message: 'Logged out successfully' };
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};

export default userResolver;
