'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input'; // Make sure to import Input
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { SparklesIcon } from 'lucide-react';
import Link from 'next/link';
import { Checkbox } from './ui/checkbox';

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }), // Add name field
  generatedText: z.string(),
  undertaking: z.boolean().refine(val => val, {
    message: 'You must accept the undertaking to proceed',
  }),
});

export default function TextSubmissionForm({
  text,
  textGemma,
  setActiveStep,
}: {
  text: string;
  textGemma: string;
  setActiveStep: (step: number) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '', // Initialize name field
      generatedText: text || '',
      undertaking: false,
    },
  });

  const [selectedText, setSelectedText] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8000/save-extracted-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name, // Include name in submission
          text: data.generatedText,
          undertaking: data.undertaking,
          model: selectedModel,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setActiveStep(3); // Go to Image Generation step

    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTextOptionClick = (text: string) => {
    setSelectedText(text);
    if (text === textGemma) {
      setSelectedModel('gemma');
    } else {
      setSelectedModel('gemini');
    }
    form.setValue('generatedText', text);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-9 w-full">
        {/* Add Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="generatedText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Generated Text</FormLabel>
              <FormControl>
                {!selectedText ? (
                  <div className="space-x-2 flex items-center w-full ">
                    {[text, textGemma].map((textOption, index) => (
                      <div
                        key={index}
                        onClick={() => handleTextOptionClick(textOption)}
                        className="cursor-pointer w-full bg-slate-200 p-2 rounded-md hover:bg-slate-300"
                      >
                        <div className="flex flex-col items-center pt-4 justify-between h-[330px]">
                          <span>{textOption}</span>
                          <span
                            className={`${
                              textOption === textGemma
                                ? 'bg-gradient-to-tr from-orange-500 to-orange-300 text-white'
                                : 'bg-gradient-to-tr from-blue-500 to-blue-400 text-white'
                            } text-xs rounded-full py-1 px-2 max-w-[60px] mt-3`}
                          >
                            {textOption === textGemma ? 'Gemma' : 'Gemini'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Textarea {...field} value={selectedText} rows={8} />
                )}
              </FormControl>
              {selectedText && (
                <div className="flex items-center gap-2 font-medium text-slate-700 float-right text-sm">
                  <SparklesIcon size={18} />
                  <h1>
                    Generated with{' '}
                    <Link
                      href={'https://gemini.google.com/'}
                      target="_blank"
                      className="underline underline-offset-2 text-blue-600"
                    >
                      {selectedModel === 'gemma' ? 'Gemma' : 'Gemini'}
                    </Link>
                  </h1>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="undertaking"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="m-8 space-y-1 leading-none">
                <FormLabel>
                  I hereby certify that all details filled in this form are truthful and accurate. I understand that providing false
                  information or misusing this platform for fraudulent reports may result in strict disciplinary and/or legal actions
                  against me.
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}