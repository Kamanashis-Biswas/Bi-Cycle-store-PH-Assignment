import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import contact from "@/assets/contact/contact.png";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold">Contact Us</h2>
          <p className="mt-4 text-lg">
            We are here to assist you with any questions or feedback!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Contact Information Section */}
        <section className="bg-white rounded-xl shadow-md p-8 mt-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:ml-6 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-gray-800">
                Contact Details
              </h3>
              <p className="text-gray-700 text-lg mt-2">
                We're always happy to hear from you! Whether you have a
                question, need support, or are interested in collaborating, feel
                free to reach out.
              </p>
              <ul className="mt-4 ml-4 list-disc">
                <li>
                  <span className="font-bold">Phone: </span>(123) 4567891234
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href="mailto:your-email@example.com" className="underline">
                    your-email@example.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-white rounded-xl shadow-md p-8 mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Send Us a Message
          </h3>
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Left Column */}
            <div className="flex-1">
              <div className="grid w-full gap-6">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input type="text" id="firstname" placeholder="First Name" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input type="text" id="lastname" placeholder="Last Name" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="Email" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="subject">Subject</Label>
                  <Input type="text" id="subject" placeholder="Subject" />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    placeholder="Type your message here."
                    id="message"
                  />
                </div>
              </div>
              <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700">
                Send Message
              </Button>
            </div>

            {/* Right Column (Optional for other content like image or map) */}
            <div className="hidden lg:flex-1 lg:flex justify-center">
              <img
                src={contact}
                alt="Contact Image"
                className="w-full max-w-md rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
