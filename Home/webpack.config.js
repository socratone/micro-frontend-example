const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'), // devServer가 바라보는 경로
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: 'defaults',
                  },
                ],
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|webp)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    // dist에 추가적으로 html 파일을 만들어주는 플러그인
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'), // html을 생성할 때 재료로 삼을 .html 파일 경로
      inject: 'body', // 'body'를 넣으면 모든 javascript resource는 body의 제일 끝에 위치하게 된다.
      filename: 'index.html', // 'index.html'라는 이름으로 파일 생성
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images/*'), // /images 이하의 모든 파일 복사
          to: path.resolve(__dirname, 'dist'),
          context: 'src', // from 경로에서 src를 지움
        },
      ],
    }),
    new ModuleFederationPlugin({
      name: 'home',
      filename: 'remoteEntry.js',
      remotes: {
        components: 'components@http://localhost:3001/remoteEntry.js',
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
