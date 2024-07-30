import { useParams } from "react-router-dom";
function SamplePage(){
    let para=useParams();
    console.log(para);
    return(
        <h1>Hello</h1>
    )
}
export default SamplePage;