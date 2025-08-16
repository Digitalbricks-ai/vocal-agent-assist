import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Euro, Calendar, Users, Phone, Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  // Contact Information
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().optional(),
  
  // Property Requirements
  propertyType: z.string().min(1, "Please select a property type"),
  budget: z.string().min(1, "Please select a budget range"),
  location: z.string().min(1, "Please specify preferred location"),
  size: z.string().min(1, "Please specify size requirements"),
  timeline: z.string().min(1, "Please select your timeline"),
  
  // Specific Requirements
  amenities: z.array(z.string()).default([]),
  additionalRequirements: z.string().optional(),
  
  // Business Information
  employeeCount: z.string().optional(),
  businessType: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const propertyTypes = [
  "Office Space",
  "Retail Store",
  "Warehouse",
  "Industrial",
  "Mixed Use",
  "Restaurant",
  "Medical Office",
  "Co-working Space",
];

const budgetRanges = [
  "€500 - €1,500/month",
  "€1,500 - €3,000/month", 
  "€3,000 - €5,000/month",
  "€5,000 - €10,000/month",
  "€10,000 - €20,000/month",
  "€20,000+/month",
];

const timelines = [
  "Immediate (within 1 month)",
  "1-3 months",
  "3-6 months", 
  "6-12 months",
  "12+ months",
];

const availableAmenities = [
  "Parking",
  "Public Transportation Access",
  "Conference Rooms",
  "Kitchen/Break Room",
  "Security System",
  "Elevator",
  "Air Conditioning",
  "High-Speed Internet",
  "Loading Dock",
  "24/7 Access",
  "Reception Area",
  "Storage Space",
];

export const LeadGeneration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amenities: [],
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setIsSubmitted(true);
    toast({
      title: "Thank you for your submission!",
      description: "We'll analyze your requirements and send you personalized property recommendations within 24 hours.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Thank You!</CardTitle>
            <CardDescription className="text-base">
              Your commercial real estate requirements have been received. Our experts will analyze your needs and send personalized property recommendations to your email within 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsSubmitted(false)} variant="outline" className="w-full">
              Submit Another Request
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <img
              src="/lovable-uploads/3f36d35d-d547-4e2d-89a9-aa62954b3801.png"
              alt="RobinRocks logo"
              className="h-8 w-auto"
              loading="eager"
              decoding="async"
            />
            <h1 className="font-bold text-xl text-foreground">RobinRocks</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Find Your Perfect Commercial Property
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tell us about your commercial real estate needs and we'll provide personalized property recommendations from our extensive database and competitor analysis.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                Commercial Property Requirements
              </CardTitle>
              <CardDescription>
                Please fill out this form with your specific requirements. The more details you provide, the better we can match you with suitable properties.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="+31 6 1234 5678" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Property Requirements */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Property Requirements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="propertyType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select property type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {propertyTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Budget *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select budget range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {budgetRanges.map((budget) => (
                                  <SelectItem key={budget} value={budget}>
                                    {budget}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Location *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Amsterdam Centrum, Rotterdam Zuid" {...field} />
                            </FormControl>
                            <FormDescription>
                              Specify city, district, or specific areas
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size Requirements *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 100-200 m², 500+ m²" {...field} />
                            </FormControl>
                            <FormDescription>
                              Specify in square meters (m²)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="timeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Timeline *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="When do you need the property?" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timelines.map((timeline) => (
                                  <SelectItem key={timeline} value={timeline}>
                                    {timeline}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="employeeCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Employees</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 10-20 employees" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Required Amenities</h3>
                    <FormField
                      control={form.control}
                      name="amenities"
                      render={() => (
                        <FormItem>
                          <FormDescription>
                            Select all amenities that are important for your business
                          </FormDescription>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {availableAmenities.map((amenity) => (
                              <FormField
                                key={amenity}
                                control={form.control}
                                name="amenities"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={amenity}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(amenity)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, amenity])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== amenity
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal">
                                        {amenity}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Additional Requirements */}
                  <FormField
                    control={form.control}
                    name="additionalRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Requirements or Comments</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any specific requirements, preferences, or questions you'd like to mention..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Tell us about any specific needs, accessibility requirements, or other important factors
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-6">
                    <Button type="submit" size="lg" className="w-full md:w-auto">
                      Get My Property Recommendations
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      We'll send you personalized recommendations within 24 hours
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};