import { useEffect } from "react";

import { useStore } from "../store/store";

export default function Error() {
  const { errorMessage, clearErrorMessage } = useStore((state) => state);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(clearErrorMessage, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, clearErrorMessage]);

  return (
    errorMessage && (
      <div className="fixed top-0 left-0 w-full bg-red-500 text-white p-4 text-center">
        <p>{errorMessage}</p>
      </div>
    )
  );
}
