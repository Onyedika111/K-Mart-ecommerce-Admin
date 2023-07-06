import { mongooseConnect } from '@/lib/mongoose';
import multiparty from 'multiparty' 



export const POST = async (req) => {
    const form = new multiparty.Form()
    try {
  
    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({fields, files})
     })
    })
    
    console.log('length:' ,files.file.length)
  
    return new Response('Success', {status: 200})
} catch (error) {
    return new Response(error.message, { status: 500 });
}
  };