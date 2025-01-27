// UserData インターフェース
// Supabase から取得する生のデータの構造を定義
// データベースのスキーマに対応
// データベースから取得したデータがどのような形をしているかを示す
export interface UserData {
  name: string;
  description: string;
  github_Id: string; // データベースのフィールド名
  qiita_id: string;
  x_id: string;
  skills: string[];
}

// User クラス
// アプリケーション内で使用するデータの構造とロジックを定義
// データベースから取得した生のデータをアプリケーション内で扱いやすい形に変換
// 必要なメソッドやプロパティを追加するために使用
class User {
  name: string;
  introduction: string; // アプリケーション内で使用するフィールド名
  githubId: string;
  qiitaId: string;
  xId: string;
  skills: string[];

  constructor(
    name: string,
    introduction: string,
    githubId: string,
    qiitaId: string,
    xId: string,
    skills: string[]
  ) {
    this.name = name;
    this.introduction = introduction;
    this.githubId = githubId;
    this.qiitaId = qiitaId;
    this.xId = xId;
    this.skills = skills;
  }

  static create(
    name: string,
    introduction: string,
    githubId: string,
    qiitaId: string,
    xId: string,
    skills: string[]
  ): User {
    const githubUrl = `https://github.com/${githubId}`;
    const qiitaUrl = `https://qiita.com/${qiitaId}`;
    const xUrl = `https://twitter.com/${xId}`;
    return new User(name, introduction, githubUrl, qiitaUrl, xUrl, skills);
  }
}

export default User;
