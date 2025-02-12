import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (env) => {
    return {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'index.js'),
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'bundle.js',
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Test-code',
                template: path.resolve(__dirname, 'public', 'index.html'),
                favicon: path.resolve(__dirname, 'public', 'favicon.png'),
            }),
            new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i, //test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'images/',
                            },
                        },
                    ],
                },
            ],
        },
        devServer: {
            port: 3001,
            open: true,
        },
    };
};
