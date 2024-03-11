'use client'
import { convertToOrgChart } from '@/lib/convert';
import React, { useState, ChangeEvent } from 'react';
import Tree from 'react-d3-tree';

const Home: React.FC = () => {
    const [jsonData, setJsonData] = useState<any>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target?.result as string);
                setJsonData(data);
            } catch (error) {
                console.error('Error parsing JSON file:', error);
            }
        };

        reader.readAsText(file);
        setIsUploading(true);

        try {
            const file = event?.target?.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/nodes", {
                method: "POST",
                body: formData,
            })
            const data = await res.json();
            // setJsonData(data);
        } catch (error) {
            console.log(error, "Error");
        } finally {
            setIsUploading(false);
        }
    };

    const orgChart = convertToOrgChart(jsonData);
    const straightPathFunc = (linkDatum: { source: any; target: any; }, orientation: string) => {
        const { source, target } = linkDatum;
        return orientation === 'horizontal'
            ? `M${source.y},${source.x}L${target.y},${target.x}`
            : `M${source.x},${source.y}L${target.x},${target.y}`;
    };

    return (
        <div className="container mx-auto px-2">

            {isUploading && <p>Uploading...</p>}
            {!isUploading && jsonData ? (
                <div className='h-screen border'>
                    <Tree
                        data={orgChart}
                        pathFunc={straightPathFunc}
                    // zoomable={false}
                    />
                </div>
            ) : (
                <div className="">
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">ONLY JSON File</p>
                            </div>
                            <input id="dropzone-file" type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
                        </label>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Home;
