const Footer = () => {
  return (
    <footer className="border-t border-border bg-header-bg py-8 backdrop-blur-sm">
      <p className="text-center text-sm text-muted">
        Built with care by{" "}
        <span className="font-medium text-heading">Campus Team</span> · ©{" "}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
