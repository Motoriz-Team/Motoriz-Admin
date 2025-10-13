import { useState, useCallback, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // <-- CSS WAJIB, JANGAN DIHAPUS
import { useDropzone } from 'react-dropzone';

// Tipe data (pastikan sama dengan di NewsPage)
type NewsArticle = {
  id: number;
  title: string;
  category: string;
  content: string;
  image?: File | string;
};

type NewsFormProps = {
  articleToEdit?: NewsArticle | null;
  onSave: (articleData: Omit<NewsArticle, 'id'>) => void;
  onCancel: () => void;
};

const NewsForm = ({ articleToEdit, onSave, onCancel }: NewsFormProps) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (articleToEdit) {
      setTitle(articleToEdit.title);
      setCategory(articleToEdit.category);
      setContent(articleToEdit.content);
      if (typeof articleToEdit.image === 'string') {
        setImagePreview(articleToEdit.image);
      }
    }
  }, [articleToEdit]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, category, content, image: imageFile || imagePreview || '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="md:col-span-2 w-full border border-gray-300 rounded-md py-2 px-3" required />
          <input type="text" placeholder="Select a Category" value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3" required />
        </div>
        
        <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
          <input {...getInputProps()} />
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="mx-auto h-24 object-contain" />
          ) : (
            <p className="text-gray-500">Upload Image</p>
          )}
        </div>

        <div style={{ height: '250px' }}>
          <ReactQuill theme="snow" value={content} onChange={setContent} style={{ height: '200px' }} placeholder="Write something here..." />
        </div>
      </div>
      
      <div className="mt-8 flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300">Batal</button>
        <button type="submit" className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">
          Publish Your Article
        </button>
      </div>
    </form>
  );
};

export default NewsForm;