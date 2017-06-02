{ pkgs,
  system,
  nodejs,
  packages }:

let
  npmConfig = {
    inherit pkgs;
    inherit system;
    inherit nodejs;
  };

  lockDir = ./lock.nix;

  getNpmPkgs = with pkgs; let
    buildPackagesLock = stdenv.mkDerivation rec {
      inherit packages;
      name = "node2nix-packages-lock";
      buildInputs = [ nodePackages.node2nix ];
      packagesJson = builtins.toJSON packages;
      packagesFile = builtins.toFile "package.json" packagesJson;
      src = ./.;
      buildPhase = ''
        mkdir opt
        cd opt
        node2nix -i $packagesFile
      '';
      installPhase = ''
        mkdir $out
        mv ./* $out/
        echo "To install the lockDir: cp -r $out ${toString lockDir}"
      '';
    }; in
      if builtins.pathExists lockDir
        then import lockDir
        else import "${buildPackagesLock}";


  npmpkgs = getNpmPkgs npmConfig;
in

[ pkgs.nodePackages.node2nix pkgs.nodejs ] ++ map (a: builtins.getAttr a npmpkgs) packages