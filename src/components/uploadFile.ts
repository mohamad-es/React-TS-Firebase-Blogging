import { supabase } from "src/config/supabaseConfig";
import { toastInstance } from "src/utils/Toast";

export async function uploadFile(file: File | null) {
  if (!file) {
    toastInstance({
      text: "No file selected!",
      type: "error",
    });
    return;
  }

  try {
    const filePath = `uploads/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("blog") // Replace 'blog' with your bucket name
      .upload(filePath, file);

    if (error) throw error;

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("blog")
      .getPublicUrl(filePath);

    if (publicUrlData) {
      toastInstance({
        text: "File uploaded successfully",
        type: "success",
      });
      console.log("File URL:", publicUrlData.publicUrl);
      return publicUrlData.publicUrl; // Return the file URL
    }
  } catch (error) {
    error instanceof Error
      ? toastInstance({
          text: error.message,
          type: "error",
        })
      : console.log(error);
  }
}
