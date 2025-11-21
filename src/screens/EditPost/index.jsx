import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./editPost.module.css";

const API_BASE = "https://blogjardim.onrender.com";

const schema = yup.object({
  titulo: yup
    .string()
    .required("O título é obrigatório.")
    .min(3, "O título deve ter pelo menos 3 caracteres."),
  conteudo: yup
    .string()
    .required("O conteúdo é obrigatório.")
    .min(10, "O conteúdo deve ter pelo menos 10 caracteres."),
});

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { titulo: "", conteudo: "" },
  });

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("Você precisa estar logado para editar posts!");
      navigate("/login");
      return;
    }

    axios
      .get(`${API_BASE}/posts/${id}`)
      .then((res) => {
        setValue("titulo", res.data.titulo || "");
        setValue("conteudo", res.data.conteudo || "");
      })
      .catch((err) => {
        console.error("Erro ao carregar post:", err);
        toast.error("Erro ao carregar o post.");
        navigate("/profile");
      })
      .finally(() => setLoading(false));
  }, [id, navigate, setValue]);

  if (loading) {
    return (
      <div className={`${styles.editpostContainer} ${isDark ? styles.dark : ''}`}>
        <p className={styles.editpostLoading}>Carregando post...</p>
      </div>
    );
  }

  const onSubmit = async (data) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Você precisa estar logado para editar posts!");
      navigate("/login");
      return;
    }

    // Pega o nome do usuário: se tiver nome válido usa ele, senão usa parte do email antes do @
    let userName = "Usuário Anônimo";
    if (user.name && user.name.trim() && user.name.trim() !== "") {
      userName = user.name.trim();
    } else if (user.email) {
      userName = user.email.split("@")[0];
    }

    try {
      await axios.put(`${API_BASE}/posts/${id}`, {
        titulo: data.titulo,
        conteudo: data.conteudo,
        autor: userName,
        email: user.email,
      });

      toast.success("Post atualizado com sucesso!");
      navigate("/profile");
    } catch (err) {
      console.error("Erro ao atualizar post:", err);
      toast.error("Erro ao atualizar o post.");
    }
  };

  return (
    <div className={`${styles.editpostContainer} ${isDark ? styles.dark : ''}`}>
      <div className={styles.editpostCard}>
        <h1 className={styles.editpostTitle}>Editar Post</h1>
        <form className={styles.editpostForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Título *</label>
            <input
              type="text"
              placeholder="Digite o título"
              {...register("titulo")}
              className={styles.formInput}
            />
            {errors.titulo && (
              <span className={styles.errorMessage}>{errors.titulo.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Conteúdo *</label>
            <textarea
              placeholder="Digite o conteúdo do post"
              rows="6"
              {...register("conteudo")}
              className={styles.formTextarea}
            ></textarea>
            {errors.conteudo && (
              <span className={styles.errorMessage}>{errors.conteudo.message}</span>
            )}
          </div>

          <div className={styles.editpostButtons}>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => navigate("/profile")}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.save}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
