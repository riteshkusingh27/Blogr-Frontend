
import {assets} from '../../assets/assets';
import {useAppContext} from '../../Context/AppContext.jsx';
import {toast} from 'react-hot-toast';
const CommentTable = ({comment,fetchComments}) => {

    const {blog , createdAt ,_id} = comment; 
    const BlogDate = new Date(createdAt);
    const {axios} = useAppContext();

    const ApproveComment  = async ()=>{
        try {
            const {data} = await axios.post('/api/admin/approve-comment', {id : _id})
            if(data.success){
                toast.success(data.message);
                fetchComments();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const deleteComment = async()=>{
       try {
          const confirm = window.confirm("Are you sure you want to delete this comment?");

            if(!confirm) return;
            const {data} = await axios.post('/api/admin/delete-comment', {id : _id})
            if(data.success){
                toast.success(data.message);
                fetchComments();
            }
            else{
                toast.error(data.message);
            }
       } catch (error) {
            toast.error(error.message);
       }
    }

  return (

               
    <tr className="order-y border-gray-300">
        <td className='px-6 py-4'>
            <b className="font-medium text-gray-600">Blog</b> :{blog.title}
            <br />
            <br />
            <b font-medium text-gray-600>Name</b> : {comment.name}
         <br />
         <b font-medium text-gray-600>Comment</b> : {comment.content}
        </td>
    <td className="px-6 py-4 s">
        {BlogDate.toLocaleDateString()}
    </td>

    <td className="px-6 py-4" > 
       
        <div className="flex items-center gap-3">
            {
                
                !comment.isApproved? 
                <img onClick={ApproveComment}
                src={assets.tick_icon} alt="" className="w-5 hover:scale-110
                transition-all"/> : <p className="text-green-500 font-medium">
                    Approved
                </p>
            }


               {/* delete icon */}
               <img  onClick={deleteComment} 
               src={assets.bin_icon} alt="" className="w-5 hover:scake-110 transition-all cursor-pointer" />
        </div>
    </td>
    </tr>


   
  )
}

export default CommentTable