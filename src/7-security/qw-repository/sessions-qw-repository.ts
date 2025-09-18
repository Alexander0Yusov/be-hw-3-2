import { db } from '../../db/mongo.db';
import { DeviceViewModel } from '../types/device-view-model';

export const sessionsQwRepository = {
  // async findById(id: string): Promise<UserViewModel | null> {
  //   const user = await db.getCollections().userCollection.findOne({ _id: new ObjectId(id) });

  //   if (user) {
  //     return {
  //       id: user._id.toString(),
  //       login: user.accountData.login,
  //       email: user.accountData.email,
  //       createdAt: user.accountData.createdAt,
  //     };
  //   }

  //   return null;
  // },

  // async findByEmailOrLogin(loginOrEmail: string): Promise<string | null> {
  //   const user = await db.getCollections().userCollection.findOne({
  //     $or: [{ 'accountData.login': loginOrEmail }, { 'accountData.email': loginOrEmail }],
  //   });

  //   if (user) {
  //     return user._id.toString();
  //   }

  //   return null;
  // },

  // async findHashById(id: string): Promise<string> {
  //   const user = await db.getCollections().userCollection.findOne({ _id: new ObjectId(id) });

  //   if (!user) {
  //     throw new Error('Hash not found');
  //   }

  //   return user.accountData.passwordHash;
  // },

  async findMany(userId: string): Promise<DeviceViewModel[]> {
    const items = await db
      .getCollections()
      .sessionCollection.find({
        userId,
        expiresAt: { $gt: new Date() },
      })
      .sort({ lastActiveDate: -1 })
      .toArray();

    return items.map((item) => ({
      ip: item.ip,
      title: item.deviceName,
      lastActiveDate: item.lastActiveDate.toISOString(),
      deviceId: item.deviceId,
    }));
  },
};
