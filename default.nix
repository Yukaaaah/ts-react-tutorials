{ pkgs ? import <nixpkgs> { inherit system; },
  system ? builtins.currentSystem,
  nodejs ? pkgs.nodejs }:

let
  webpackPackages = [
    "autoprefixer"
    "copy-webpack-plugin"
    "css-loader"
    "css-mqpacker"
    "cssnano"
    "imports-loader"
    "inline-loader"
    "perfectionist"
    "postcss-conditionals"
    "postcss-css-variables"
    "postcss-custom-media"
    "postcss-discard-comments"
    "postcss-import"
    "postcss-loader"
    "style-loader"
    "svg-url-loader"
    "url-loader"
  ];
  npmInputs = import ./nix-npm {
    inherit pkgs system nodejs;
    packages = [ "typescript" "yarn" "typings" "webpack" ] ++ webpackPackages;
  };
in

with pkgs;
stdenv.mkDerivation {
  name = "ts-react-tutorials";
  buildInputs = npmInputs;
}