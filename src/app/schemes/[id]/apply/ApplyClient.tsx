"use client";

import React, { useState } from 'react';
import { UploadZone } from '@/components/apply/UploadZone';
import { DocumentStatusCard } from '@/components/apply/DocumentStatusCard';
import { ChecklistItem } from '@/components/apply/ChecklistItem';
import { analyzeDocuments, UploadedFileMeta } from '@/actions/documents';

type ApplyScheme = {
  id: string;
  title: string;
  description: string;
  ministry: string;
  targetGroup: string;
  endDate: string | null;
  requiredDocuments: string[];
};

type ApplyClientProps = {
  scheme: ApplyScheme;
  initialCheck: {
    readinessScore?: number;
    missingDocuments?: string[];
    aiSummary?: string;
    uploadedDocuments?: unknown;
    [key: string]: unknown;
  } | null;
};

export function ApplyClient({ scheme, initialCheck }: ApplyClientProps) {
  const initialDocs = Array.isArray(initialCheck?.uploadedDocuments)
    ? (initialCheck.uploadedDocuments as string[]).map((name: string) => ({ name, path: '', size: 0 }))
    : [];
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileMeta[]>(initialDocs);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [checkResult, setCheckResult] = useState<{
    readinessScore?: number;
    missingDocuments?: string[];
    aiSummary?: string;
    uploadedDocuments?: unknown;
    [key: string]: unknown;
  } | null>(initialCheck);

  const handleUploadSuccess = (file: UploadedFileMeta) => {
    setUploadedFiles(prev => [...prev, file]);
  };

  const handleProcessDocuments = async () => {
    setIsAnalyzing(true);
    const result = await analyzeDocuments(scheme.id, uploadedFiles);
    if (result.success && result.data) {
      setCheckResult(result.data);
    } else {
      alert(result.error || "Failed to process documents");
    }
    setIsAnalyzing(false);
  };

  // Compute status metrics
  const readinessScore = checkResult?.readinessScore || 0;
  const missingDocs = checkResult?.missingDocuments || scheme.requiredDocuments || [];
  const aiSummary = checkResult?.aiSummary || "Upload documents to get AI verification.";
  
  const requiredCount = scheme.requiredDocuments.length;
  const verifiedCount = Math.max(0, requiredCount - missingDocs.length);
  const progressPercent = requiredCount === 0 ? 100 : Math.round((verifiedCount / requiredCount) * 100);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left Panel: Context & Requirements (40%) */}
      <aside className="w-full md:w-[40%] flex flex-col gap-6">
        
        {/* Scheme Header Card */}
        <div className="bg-card rounded-[20px] p-6 shadow-[0px_10px_30px_rgba(34,34,34,0.05)] flex flex-col gap-2 border border-border/10">
          <div className="inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full w-fit mb-2">
            <span className="material-symbols-outlined text-[16px] text-foreground">account_balance</span>
            <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">{scheme.ministry}</span>
          </div>
          <h1 className="text-[32px] font-semibold text-foreground leading-tight">{scheme.title}</h1>
          <p className="text-[16px] text-muted-foreground mt-2 line-clamp-3">
            {scheme.description}
          </p>
          {scheme.endDate ? (() => {
            const end = new Date(scheme.endDate);
            const now = new Date();
            const diffTime = end.getTime() - now.getTime();
            const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (daysLeft < 0) {
              return (
                <div className="flex items-center gap-2 mt-4 text-destructive p-3 bg-destructive/10 rounded-lg">
                  <span className="material-symbols-outlined text-destructive">error</span>
                  <span className="text-[14px] font-semibold">Application Closed on {end.toLocaleDateString()}</span>
                </div>
              )
            }

            return (
              <div className="flex items-center gap-2 mt-4 text-destructive p-3 bg-destructive/10 rounded-lg">
                <span className="material-symbols-outlined text-destructive">schedule</span>
                <span className="text-[14px] font-semibold">
                  Application Closes: <strong>{daysLeft} Days</strong> ({end.toLocaleDateString()})
                </span>
              </div>
            )
          })() : (
            <div className="flex items-center gap-2 mt-4 text-[#5f613a] p-3 bg-[#5f613a]/10 border border-[#5f613a]/20 rounded-lg">
              <span className="material-symbols-outlined text-[#5f613a]">event_available</span>
              <span className="text-[14px] font-semibold">Accepting Applications (Open Enrollment)</span>
            </div>
          )}
        </div>

        {/* Eligibility Met Card */}
        <div className="bg-card rounded-[20px] p-6 shadow-[0px_10px_30px_rgba(34,34,34,0.05)] flex flex-col gap-3 border border-border/10">
          <h2 className="text-[24px] font-semibold text-foreground flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5f613a]">verified</span>
            Eligibility Confirmed
          </h2>
          <ul className="flex flex-col gap-3 mt-2">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#5f613a] mt-0.5">check_circle</span>
              <div>
                <span className="block text-[14px] font-semibold text-foreground">Age Requirement</span>
                <span className="block text-[14px] text-muted-foreground text-sm">Over 18 years verified via profile.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#5f613a] mt-0.5">check_circle</span>
              <div>
                <span className="block text-[14px] font-semibold text-foreground">Target Group</span>
                <span className="block text-[14px] text-muted-foreground text-sm">Matches scheme priority: {scheme.targetGroup}.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Interactive Checklist */}
        <div className="bg-card rounded-[20px] p-6 shadow-[0px_10px_30px_rgba(34,34,34,0.05)] flex flex-col gap-3 border border-border/10">
          <h2 className="text-[24px] font-semibold text-foreground mb-2">Required Documents</h2>
          {scheme.requiredDocuments.length > 0 ? (
            scheme.requiredDocuments.map((doc: string, idx: number) => {
              const isMissing = missingDocs.includes(doc);
              const isVerified = !isMissing && checkResult;
              let status: 'verified' | 'missing' | 'pending' = 'pending';
              
              if (checkResult) {
                status = isVerified ? 'verified' : 'missing';
              } else if (uploadedFiles.some(f => f.name.toLowerCase().includes(doc.toLowerCase()))) {
                status = 'pending'; // Uploaded but not yet checked
              }

              return <ChecklistItem key={idx} label={doc} status={status} />;
            })
          ) : (
            <p className="text-muted-foreground text-sm">No documents required.</p>
          )}
        </div>

      </aside>

      {/* Right Panel: Workspace & AI Review (60%) */}
      <section className="w-full md:w-[60%] flex flex-col gap-6">
        
        {/* Progress & Status Header */}
        <div className="bg-card rounded-[20px] p-6 shadow-[0px_10px_30px_rgba(34,34,34,0.05)] border border-border/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-[24px] font-semibold text-foreground">Document Readiness</h2>
            <p className="text-[16px] text-muted-foreground text-sm mt-1">
              {checkResult ? `AI has verified ${verifiedCount} of ${requiredCount} required documents.` : `Awaiting upload and verification.`}
            </p>
          </div>
          {/* Linear Progress */}
          <div className="w-full sm:w-48 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-[14px] font-semibold text-foreground">{progressPercent}%</span>
              <span className="text-[14px] font-semibold text-muted-foreground">{verifiedCount}/{requiredCount} Complete</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-foreground rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <UploadZone onUploadSuccess={handleUploadSuccess} />

        {/* Process Button */}
        {uploadedFiles.length > 0 && (
          <div className="flex justify-end">
            <button 
              onClick={handleProcessDocuments}
              disabled={isAnalyzing}
              className="px-6 py-3 rounded-full bg-foreground text-background text-[14px] font-semibold hover:bg-foreground/90 transition-all duration-300 shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-[18px] ${isAnalyzing ? 'animate-spin' : ''}`}>
                {isAnalyzing ? 'sync' : 'smart_toy'}
              </span>
              {isAnalyzing ? 'AI Reviewing Documents...' : 'Process Documents with AI'}
            </button>
          </div>
        )}

        {/* Document Status Cards Grid */}
        <div className="grid grid-cols-1 gap-4 mt-2">
          
          {isAnalyzing ? (
            <DocumentStatusCard type="skeleton" />
          ) : (
            <>
              {checkResult && (
                <div className="bg-[#5f613a]/10 p-4 rounded-[20px] mb-2 border border-[#5f613a]/20 flex gap-3">
                   <span className="material-symbols-outlined text-[#5f613a] text-[24px]">smart_toy</span>
                   <div>
                     <h4 className="font-semibold text-foreground text-[14px]">AI Review Summary</h4>
                     <p className="text-[14px] text-muted-foreground mt-1">{aiSummary}</p>
                   </div>
                </div>
              )}

              {uploadedFiles.map((f, i) => (
                <DocumentStatusCard 
                  key={i}
                  type={checkResult ? "verified" : "skeleton"} 
                  title={f.name}
                  subtitle={f.size ? `Size: ${(f.size / 1024 / 1024).toFixed(2)} MB` : 'Previously Uploaded'}
                  message={checkResult ? "Document uploaded successfully and processed by AI." : "Pending AI Review."}
                  confidence={checkResult ? readinessScore : 0}
                />
              ))}

              {missingDocs.map((doc: string, i: number) => (
                <DocumentStatusCard 
                  key={`missing-${i}`}
                  type="missing"
                  title={doc}
                  subtitle="Required"
                  message={`Please upload a valid ${doc} to proceed.`}
                />
              ))}
            </>
          )}

        </div>

      </section>

      {/* Bottom Sticky Action Bar portal could go here or we keep it in page.tsx */}
    </div>
  )
}
