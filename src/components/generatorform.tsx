"use client";
import { useState, FormEvent } from "react";

export default function GeneratorForm() {
  const [prompt, setPrompt] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(prompt);
    const response = await fetch("/api/image-generator", {
      method: "POST",
      body: JSON.stringify(prompt),
    });
    const data = await response.json();
    console.log(data.dataUrl);
    setImageSrc(data.dataUrl);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e: any) => setPrompt(e.target.value)}
          value={prompt}
          placeholder="Enter prompt"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          required
        />
        <button
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
        >
          Generate
        </button>
      </form>
      {
        imageSrc && <img src={imageSrc} alt="Generated Image" />
      }
    </div>
  );
}
