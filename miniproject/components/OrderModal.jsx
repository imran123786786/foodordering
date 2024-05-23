import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import css from '../styles/OrderModel.module.css';
import { createOrder } from "../lib/orderhandler";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "../store/store";
import { useRouter } from "next/router";
export default function OrderModal({ opened, setOpened, PaymentMethod }) {
  const theme = useMantineTheme();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetCart = useStore((state) => state.resetCart);
  const total = typeof window !== 'undefined' && localStorage.getItem('total');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = await createOrder({ ...formData, total, PaymentMethod });
      toast.success("Order placed successfully");
      resetCart();
      typeof window !== 'undefined' && localStorage.setItem('order', id);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error("Failed to place order. Please try again later.");
    }
    router.push(`/order/$(id)`)
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <form onSubmit={handleSubmit} className={css.formContainer}>
        <input onChange={handleInput} type="text" name="name" required placeholder="Name" />
        <input onChange={handleInput} type="text" name="phone" required placeholder="Phone number" />
        <textarea onChange={handleInput} name="address" rows={3} placeholder="Address"></textarea>
        <span>You will pay <span>$ {total}</span> on delivery</span>
        <button type="submit" className="btn">Place Order</button>
      </form>
      <Toaster />
    </Modal>
  );
}
