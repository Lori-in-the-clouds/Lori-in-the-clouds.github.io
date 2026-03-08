"use client";
import React from "react";
import { HeroParallax  } from "../ui/hero-parallax";

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
export const products = [

  { title: "Python", thumbnail: "/skills/python.svg", link: "#" },
  { title: "PyTorch", thumbnail: "/skills/pytorch.svg", link: "#" },
  { title: "TensorFlow", thumbnail: "/skills/tensorflow.svg", link: "#" },
  { title: "C++", thumbnail: "/skills/cpp.svg", link: "#" },
  { title: "C", thumbnail: "/skills/c.svg", link: "#" },
  { title: "Linux", thumbnail: "/skills/linux.svg", link: "#" },

  { title: "Docker", thumbnail: "/skills/docker.svg", link: "#" },
  { title: "Git", thumbnail: "/skills/git.svg", link: "#" },
  { title: "Bash", thumbnail: "/skills/bash_dark.svg", link: "#" },
  { title: "GCP", thumbnail: "/skills/gcloud.svg", link: "#" },
  { title: "CUDA", thumbnail: "/skills/cuda.svg", link: "#" },
  { title: "NumPy", thumbnail: "/skills/numpy.svg", link: "#" },

  { title: "Pandas", thumbnail: "/skills/pandas.svg", link: "#" }, 
  { title: "Scikit-Learn", thumbnail: "/skills/sklearn.svg", link: "#" },
  { title: "Java", thumbnail: "/skills/java.svg", link: "#" },
  { title: "Kafka", thumbnail: "/skills/kafka.svg", link: "#" },
  { title: "Kubernetes", thumbnail: "/skills/kubernetes.svg", link: "#" },
  { title: "GitHub", thumbnail: "/skills/github.svg", link: "#" },
];
