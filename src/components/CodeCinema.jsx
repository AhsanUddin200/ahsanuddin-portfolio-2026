import {
  motion,
  useReducedMotion,
} from "framer-motion";


const codeColumns = [
  [
    "const developer = {",
    '  name: "Ahsan Nasir",',
    '  stack: ["React", "Python", "Odoo"],',
    "  shipping: true,",
    "};",
    "",
    "async function buildProduct() {",
    "  const idea = await understandProblem();",
    "  const system = await designSolution(idea);",
    "  return deploy(system);",
    "}",
    "",
    "export default developer;",
  ],

  [
    "class ERPService:",
    "    def automate(self, workflow):",
    "        rules = self.map_process(workflow)",
    "        return self.deploy(rules)",
    "",
    "def scale_business(data):",
    "    insights = analyze(data)",
    "    return optimize(insights)",
    "",
    "ODOO = True",
    "POSTGRESQL = True",
    "PYTHON = True",
  ],

  [
    "function Portfolio() {",
    "  return (",
    "    <Experience>",
    "      <React />",
    "      <APIs />",
    "      <OdooERP />",
    "      <Cloud />",
    "    </Experience>",
    "  );",
    "}",
    "",
    "// build → test → ship → improve",
  ],
];


function CodeColumn({
  lines,
  duration,
  delay,
  className,
}) {
  const prefersReducedMotion =
    useReducedMotion();

  const block = (
    <>
      {lines.map(
        (line, index) => (
          <span
            className={
              line.includes(
                "Ahsan"
              )
                ? "code-cinema-highlight"
                : ""
            }
            key={`${line}-${index}`}
          >
            {line || "\u00A0"}
          </span>
        )
      )}
    </>
  );


  return (
    <div
      className={`code-cinema-column ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="code-cinema-track"
        initial={{
          y: "0%",
        }}
        animate={
          prefersReducedMotion
            ? {
                y: "0%",
              }
            : {
                y: "-50%",
              }
        }
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="code-cinema-block">
          {block}
        </div>

        <div className="code-cinema-block">
          {block}
        </div>
      </motion.div>
    </div>
  );
}


function CodeCinema() {
  const prefersReducedMotion =
    useReducedMotion();


  return (
    <div
      className="code-cinema"
      aria-hidden="true"
    >
      <div className="code-cinema-vignette" />

      <div className="code-cinema-stage">
        <CodeColumn
          lines={codeColumns[0]}
          duration={25}
          delay={0}
          className="code-cinema-column-left"
        />

        <CodeColumn
          lines={codeColumns[1]}
          duration={31}
          delay={-7}
          className="code-cinema-column-center"
        />

        <CodeColumn
          lines={codeColumns[2]}
          duration={27}
          delay={-12}
          className="code-cinema-column-right"
        />
      </div>


      {!prefersReducedMotion && (
        <>
          <motion.div
            className="code-cinema-scanline"
            animate={{
              y: [
                "-15vh",
                "115vh",
              ],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.div
            className="code-cinema-flare code-cinema-flare-a"
            animate={{
              x: [
                "-8%",
                "22%",
                "-8%",
              ],
              y: [
                "0%",
                "18%",
                "0%",
              ],
              opacity: [
                0.18,
                0.42,
                0.18,
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="code-cinema-flare code-cinema-flare-b"
            animate={{
              x: [
                "5%",
                "-18%",
                "5%",
              ],
              y: [
                "8%",
                "-12%",
                "8%",
              ],
              opacity: [
                0.12,
                0.34,
                0.12,
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}


      <div className="code-cinema-fade" />
    </div>
  );
}


export default CodeCinema;
