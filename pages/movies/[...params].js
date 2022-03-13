import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../../components/Seo";

export default function detail({ params }) {
  const router = useRouter();
  const [title, id] = params || [];

  const [data, setData] = useState("");

  useEffect(() => {
    (async () => {
      const { homepage } = await (await fetch(`/api/movies/${id}`)).json();
      setData(homepage);
    })();
  }, []);
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
      <div>
        {data === "" ? (
          "Loading..."
        ) : (
          <>
            <a href={data}>{data}</a>
          </>
        )}
      </div>
    </div>
  );
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}
