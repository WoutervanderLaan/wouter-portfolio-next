import { KeyPressContext } from "@/context/key-press-context";
import { useContext } from "react";

const useKeyPressContext = () => {
  const keyPressContext = useContext(KeyPressContext);

  if (!keyPressContext) throw Error("Key press context used outside provider");

  return keyPressContext;
};

export default useKeyPressContext;
