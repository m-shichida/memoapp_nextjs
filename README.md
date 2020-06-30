# NextJs + Reduxのメモアプリ(あとでrecoilに移行する)
他には
- semantic-ui-react
- styled-component

# プリレンダリング
[Qiitaより参照](https://qiita.com/thesugar/items/01896c1faa8241e6b1bc#%E3%83%AC%E3%83%83%E3%82%B9%E3%83%B34-%E3%83%97%E3%83%AA%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%A8%E3%83%87%E3%83%BC%E3%82%BF%E3%83%95%E3%82%A7%E3%83%83%E3%83%81%E3%83%B3%E3%82%B0)

NextJsでは予めHTMLを生成する。
静的生成(Static Generation)とサーバサイドレンダリング(SSR)の2種類のプリレンダリングがあり、サーバーサイドレンダリングは毎回のリクエストごとにHTMLを生成するプリレンダリング手法である。

## どっちを選択すべき?
基本的には静的生成を選択するべきだが、ビルド時に外部データを取得しないと生成できないページではSSRを選択するべき。
NextJSでは外部データありの静的生成が可能である。それで使用するのが**getStaticProps**。

# getStaticProps
[Qiitaより参照](https://qiita.com/thesugar/items/01896c1faa8241e6b1bc#getstaticprops-%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%9F%E3%83%87%E3%83%BC%E3%82%BF%E6%9C%89%E3%82%8A%E3%81%AE%E9%9D%99%E7%9A%84%E7%94%9F%E6%88%90)

`getStaticProps`を使うと
- ビルド時にページの**内容**が外部データを要する場合、プリレンダリングするときはまずその依存関係を解決すること
  - 開発環境では、getStaticPropsは毎回のリクエストごとに実行される。

`getStaticProps`はページからのみexportできる。pageではないファイルからexportすることはできない。

外部データなどで取得したデータをpropsとしてページコンポーネントに渡すことができる。
例:ファイルシステムからデータを取得する

```ts
export const getStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
```

例:外部APIからデータを取得する(Qiitaより)

```ts
import fetch from 'node-fetch'

export async function getSortedPostsData() {
  // ファイルシステムのかわりに、
  // 外部の API エンドポイントから投稿データを取得する
  const res = await fetch('..')
  return res.json()
}
```

# サーバーサイドレンダリング(SSR)で外部データを取得する(getServerSideProps)(あとで調べる)
`getServerSideProps`では「リクエスト時にデータを取得しなければならないページをプリレンダリングする必要がある場合にのみ使う」(Qiitaより)

# SWR(あとで調べる)
クライアント側でデータを取得する場合に使用する。キャッシング、再検証（revalidation）、フォーカストラッキング、インターバルを
開けた再フェッチなどに対応している。

# getStaticPath
`getStaticProps`はページの**内容**が外部に依存するとき
`getStaticPath`はページの**パス**が外部に依存するときに使う(/posts/:idとか)

```ts
export async function getStaticPaths() {
  const paths = getAllPostIds();
  // paths = {
  //   params: {
  //     id: xx
  //   }
  // }
  return {
    paths, // params以下のパラメータと[]内が合わないとだめ ex.[id]だと、params: { id: xx }
    fallback: false,
  };
}
```

## fallback: falseとは?

```ts
return {
  paths,
  fallback: false, // returnされていないpathsにアクセスしても404になる。
};
```

`fallback: true`にすると、もし存在しないパスにアクセスしてしまうと「そのページの「fallback」バージョンを提供」する。

# 共通コンポーネント
全てのファイルに共通して適用したいスタイリングは`_app.tsx`にて記述が可能。
この`_app.tsx`では、「Next.jsはAppコンポーネントを使ってページの初期化を行います。」[URL](https://nextjs.org/docs/advanced-features/custom-app)(DeepLにて翻訳)とのこと。

他にも
- ページ移動間の固定レイアウト
- Reduxの`Provider`でラップする
- ページに追加データを挿入

など全ページでの挙動を書くことができる。

# router
## ページ内リンクを設置する

```ts
import Link from 'next/link'
```

## idを付与して/posts/:idでアクセスできるようにしたい。
idを付与して/posts/:idでアクセスできるようにするには、

```
pages
  L posts
      L [id].tsx
```

というように`[]`で囲う必要がある。
また`Link`を使用して動的にルーティングしたい場合には
`[]`でパラメータを囲い、かつas句で実際に出力されるパラメータ(`id`)を指定する。

```ts
<Link href="/posts/[id]" as={`/posts/${id}`}>
    <a>{title}</a>
</Link>
```

## 保存に成功したら別ページへ遷移したい。
```ts
import Router from 'next/router'

// ~ 省略 ~
const handleSubmit = () => {
  dispatch(postsActions.addPost(post));
  Router.push('/'); // push()の引数でpathを指定する
};

// [id].tsx などの場合は？
Router.push('/post/[id]', '/post/1') // 第2引数でidを指定する
```

# グローバルスタイリング(あとで投稿内容をスタイリングする)
