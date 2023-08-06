import * as bcrypt from 'bcryptjs';

class Hash {
  static compare = async (params: HashCompareParams): Promise<boolean> => {
    const { hash, plain } = params;
    const isValidHash = await bcrypt.compare(plain, hash);
    return isValidHash;
  };
}

type HashCompareParams = {
  hash: string,
  plain: string
};
export default Hash;
