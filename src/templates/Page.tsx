import Header from "../components/Header";

const Page = ({
    title,
    children,
    }: {
    title:string,
    children: React.ReactNode,
    }) => {
   
  
   return (
      <div>
          <Header title={title}/>
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
      </div>
   );
  }
  
  export default Page; 