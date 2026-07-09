import { useEffect, useState } from "react";


function Posts() {


  const [posts, setPosts] = useState([]);

  const [index, setIndex] = useState(0);



  useEffect(() => {


    const fetchPosts = async () => {


      try {


        const response = await fetch(
          "https://dummyjson.com/posts"
        );


        const data = await response.json();


        setPosts(data.posts);


      }

      catch(error){

        console.log(error);

      }


    };


    fetchPosts();


  }, []);




  const nextPost = () => {


    if(index < posts.length - 1){

      setIndex(index + 1);

    }


  };




  const previousPost = () => {


    if(index > 0){

      setIndex(index - 1);

    }


  };



  return (

    <div>


      <h1 className="title">
        Posts
      </h1>



      <div className="post-slider">


        <button
          className="arrow-btn"
          onClick={previousPost}
        >

          -

        </button>





        <div className="post-card">


          <h2>
            {posts[index]?.title}
          </h2>


          <p>
            {posts[index]?.body}
          </p>


          <span>

            Post ID : {posts[index]?.id}

          </span>


        </div>





        <button
          className="arrow-btn"
          onClick={nextPost}
        >

          +

        </button>



      </div>



    </div>

  );

}


export default Posts;