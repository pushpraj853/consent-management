import { useSelector } from "react-redux";
import { RootState } from "../../store";

const FullPageLoader = () => {
  const loaderData = useSelector((state: RootState) => state.loaderData);

  if (loaderData?.isVisible) {
    return (
      <div className="fullPgLoaderWrap">
        <div className="loaderWrap">
          {/* spinner component */}
          {loaderData?.loaderText ? (
            <p>
              {typeof loaderData.loaderText === "string" ? loaderData.loaderText : "Loading..."}
            </p>
          ) : null}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default FullPageLoader;
