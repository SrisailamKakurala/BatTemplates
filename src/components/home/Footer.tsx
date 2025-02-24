import Logo from '@/components/logo/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 bg-darkBackground">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <Logo classNames="h-12 w-auto mb-4 md:mb-0" />
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} BatTemplates. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a
            href="https://github.com/srisailamkakurala/battemplates"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-primary duration-200"
          >
            GitHub
          </a>
          <a
            href="/contribute"
            className="text-gray-300 hover:text-primary duration-200"
          >
            Contribute
          </a>
          <a
            href="/privacy"
            className="text-gray-300 hover:text-primary duration-200"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
