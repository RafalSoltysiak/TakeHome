import { useGetListData } from "../api/getListData";
import Error from "./Error";
import MyAwesomeList from "./MyAwesomeList";
import DeletedCards from "./DeletedCards";
import Spinner from "./Spinner";

export const Entrypoint = () => {
  const { isLoading } = useGetListData();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Error />
      <div className="flex gap-x-8 justify-between p-8">
        <div className="flex-1">
          <MyAwesomeList />
        </div>
        <div className="flex-1">
          <DeletedCards />
        </div>
      </div>
    </>
  );
};
