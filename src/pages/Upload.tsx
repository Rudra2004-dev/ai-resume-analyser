import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabase";
import FileUploader from "../components/FileUploader"
import {convertPdfToImage} from "../lib/pdf2img"


const Upload = () => {

     const navigate = useNavigate();

     const [isProcessing, setIsProcessing] = useState(false);
     const [statusText, setStatusText] = useState("");
     const [file, setFile] = useState<File | null>(null);

     const handleFileSelect = (file : File | null) => {
        setFile(file);
     };


     const handleAnalyse = async ({
        companyName,
        jobTitle,
        jobDescription,
        file,
     } : {
        companyName: string,
        jobTitle: string,
        jobDescription: string,
        file: File,
     }) => {
        try{
            setIsProcessing(true);

            //upload resume pdf

            setStatusText("Uploading resume...");

            const resumePath = `resume/${Date.now()}-${file.name}`;

            const {error: resumeError} = await supabase.storage
                .from("resumes")
                .upload(resumePath, file);

            if(resumeError) {
                setStatusText("Error uploading resume");
                return;
            }
            
            //convert pdf to img

            setStatusText("Converting PDF to image...");

            const imageFile = await convertPdfToImage(file);

            if(!imageFile.file){
                setStatusText("Error converting PDF");
            }


            //upload img

            setStatusText("Uploading image...");

            if(!imageFile.file){
                setStatusText("Failed to create preview image");
                return;
            }

            const imagePath = `resume-images/${Date.now()}-${imageFile.file.name}`;

            const {error: imageError} = await supabase.storage
            .from("resumes")
            .upload(imagePath, imageFile.file);

            if(imageError){
                setStatusText("Error uploading image");
                return;
            }


            //prepare resume data

            setStatusText("Saving data...");

            const uuid = crypto.randomUUID();

            const data = {
                id: uuid,
                resumePath,
                imagePath,
                companyName,
                jobTitle,
                jobDescription,

                //dummy feedback

                feedback: {
                    score: 85,
                    strengths: [
                        "Good resume structure",
                        "Strong froted skills",
                    ],
                    weakness: [
                        "Add more projects",
                        "Improve ATS keywords",
                    ],
                },
            };

            //save to supabase db

            const {error: dbError} = await supabase
            .from("resumes")
            .insert([data]);

            if(dbError) {
                setStatusText("Error saving resume data");
                return;
            }

            //ai integration
            //
            //
            //
            //

            setStatusText("Analysis comple!");
            console.log(data);

            navigate(`/resume/${uuid}`);
        } catch (error){
            console.log(error);
            setStatusText("Something went wrong");
        } finally {
            setIsProcessing(false);
        }
     };


     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData(form);

        const companyName = formData.get("company-name") as string;

        const jobTitle = formData.get("job-title") as string;

        const jobDescription = formData.get("job-description") as string;

        if(!file) {
            alert("Please upload resume");
            return;
        }

        handleAnalyse({
            companyName,
            jobTitle,
            jobDescription,
            file,
        });
     };

     
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar/>
        <section className="main-section">
            <h1>Smart feedback from your dream job</h1>
            {isProcessing ? (
                <>
                <h2>{statusText}</h2>
                <img
                src="/images/resume-scan.gif"
                className="w-full"
                />
                </>
            ) : (
                <h2>Drop your resume for an ATS score and improvement tips</h2>
            )}

            {!isProcessing && (
                <form 
                id="upload-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-8">

                    //company name

                    <div className="form-div">
                        <label htmlFor="company-name"> Company Name </label>

                        <input 
                        type="text"
                        name="company-name"
                        placeholder="company-name"
                        id="comapny-name"
                         />
                    </div>

                    //job title

                    <div className="form-div">
                        <label htmlFor="job-title"> Job Title </label>

                        <input 
                        type="text"
                        name="job-title"
                        placeholder="job-title"
                        id="job-title"
                         />
                    </div>

                    //job description

                    <div className="form-div">
                        <label htmlFor="job-description">Job-Description</label>

                        <textarea 
                        rows={5}
                        name="job-description"
                        placeholder="job-description"
                        id="job-description"
                         />
                    </div>

                    //resume upload

                    <div className="form-div">
                        <label htmlFor="uploader">Upload Resume</label>
                        
                        <FileUploader 
                        onFileSelect={handleFileSelect}
                        />
                    </div>

                    //submit button

                    <button 
                    className="primary-button"
                    type="submit"
                    >Analyse Resume</button>
                </form>
            )}
        </section>
    </main>
  )
}
export default Upload