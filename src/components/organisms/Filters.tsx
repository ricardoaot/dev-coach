import { useState } from "react";
import SelectInput from "../atoms/inputs/SelectInput";
import { QuestionData } from "../../interfaces/interfaces";

const jsonFiles = import.meta.glob("../../assets/*.json", { eager: true });
// Lista de archivos JSON disponibles (puedes agregar más)
// Generar la lista de opciones a partir de los archivos JSON
const availableJsons = Object.keys(jsonFiles).map((filePath) => {
  // Extraer el nombre del archivo sin la ruta ni la extensión
  const fileName = filePath.split("/").pop()?.replace(".json", "") || "";
  // Crear un label legible (por ejemplo, "preguntas_react" -> "React")
  const label = fileName
    .replace("preguntas_", "") 
    .replace("_", " ") 
    .toUpperCase(); 
  console.log(label, fileName);
  return {
    label,
    value: fileName + ".json", // Mantener el nombre original como value
  };
});

interface SelectOption {
  value: string;
  label: string;
}
interface JsonFileContent {
  questions: QuestionData[];
}

interface FiltersProps {
  onDataChange: (data: QuestionData[]) => void; // Función para enviar la data al padre
}

const Filters = ({ onDataChange }: FiltersProps) => {
  const [data, setData] = useState<QuestionData[]>([]);

  const questionLevels: SelectOption[] = [
    { value: "Principiante", label: "Principiante" },
    { value: "Intermedio", label: "Intermedio" },
    { value: "Avanzado", label: "Avanzado" },
  ];

  // Cuando cambia el JSON seleccionado, obtener sus datos
  const handleJsonChange = (selected: SelectOption) => {
    // Buscar el contenido del JSON en los archivos importados
    const jsonData = jsonFiles[`../../assets/${selected.value}`] as
      | JsonFileContent
      | { default: QuestionData[] }
      | undefined;
    if (!jsonData) return;
    // Asegurar que la data esté correctamente extraída
    const data: QuestionData[] | null =
      "default" in jsonData ? jsonData.default : null;
    if (data) {
      setData(data);
      onDataChange(data);
    }
  };
  const handleLevelChange = (selected: SelectOption) => {
    console.log(selected);
    if (!selected) {
      onDataChange(data);
    } else {
      const filteredData = data.filter(
        (d) => d.questionLevel === selected.value
      );

      onDataChange(filteredData); // Enviar data filtrada al padre
    }
  };

  return (
    <div className="flex  gap-4 w-full">
      {/* Select para elegir el JSON */}
      <SelectInput options={availableJsons} onChange={handleJsonChange} />

      {questionLevels.length > 0 && (
        <SelectInput
          options={questionLevels}
          onChange={handleLevelChange}
          placeholder="Selecciona un nivel"
        />
      )}
    </div>
  );
};

export default Filters;
