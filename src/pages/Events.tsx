import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock, Tag } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React, { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { EVENTS_DATA, type Event } from "@/data/events";

const EventCard = React.memo(({ event, index, onClick }: { event: Event; index: number; onClick: (event: Event) => void }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.35, delay: index * 0.08 }}>
    <Card onClick={() => onClick(event)} className="group cursor-pointer overflow-hidden border-border/70 bg-card/70 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/5">
      <div className="relative h-48 overflow-hidden bg-muted"><img src={event.image} alt={event.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" /><div className="absolute left-4 top-4"><Badge className="rounded-full bg-background/90 px-3 text-xs text-foreground backdrop-blur-sm hover:bg-background/90">{event.status}</Badge></div></div>
      <CardContent className="p-5 sm:p-6"><div className="flex items-center justify-between gap-3"><span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar className="h-3.5 w-3.5 text-primary" />{event.date}</span><span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Tag className="h-3.5 w-3.5 text-primary" />{event.avenue}</span></div><h2 className="mt-4 text-xl font-bold tracking-tight text-foreground">{event.title}</h2><p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{event.description}</p><div className="mt-5 space-y-2 border-t border-border/60 pt-4 text-xs text-muted-foreground"><p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 shrink-0 text-primary" />{event.time}</p><p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />{event.location}</p><p className="flex items-center gap-2"><Users className="h-3.5 w-3.5 shrink-0 text-primary" />{event.attendees}{event.status === "Upcoming" ? " expected participants" : ""}</p></div></CardContent>
    </Card>
  </motion.div>
));

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchParams] = useSearchParams();
  const selectedDate = searchParams.get("eventDate") ?? "all";
  const selectedMonth = searchParams.get("eventMonth") ?? "all";
  const selectedYear = searchParams.get("eventYear") ?? "all";
  const selectedAvenue = searchParams.get("eventAvenue") ?? "all";

  const filteredEvents = useMemo(() => EVENTS_DATA.filter((event) => {
    const eventDay = event.date.match(/^[A-Za-z]+\s+(\d{1,2})/)?.[1] ?? "";
    const eventYear = event.date.match(/\d{4}/)?.[0] ?? "";
    return (selectedDate === "all" || eventDay === selectedDate) && (selectedMonth === "all" || event.month === selectedMonth) && (selectedYear === "all" || eventYear === selectedYear) && (selectedAvenue === "all" || event.avenue.includes(selectedAvenue));
  }), [selectedDate, selectedMonth, selectedYear, selectedAvenue]);

  const handleEventClick = useCallback((event: Event) => setSelectedEvent(event), []);

  return (
    <>
      <div className="min-h-screen py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-16 text-center"><h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Events</h1><p className="mx-auto mt-5 max-w-none text-xl leading-7 text-muted-foreground sm:whitespace-nowrap">Discover the experiences, ideas, and connections shaping the new Rotary year.</p></motion.div>
        {filteredEvents.length > 0 ? <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{filteredEvents.map((event, index) => <EventCard key={event.title} event={event} index={index} onClick={handleEventClick} />)}</div> : <div className="rounded-3xl border border-dashed border-border p-12 text-center"><p className="text-lg font-semibold text-foreground">No events found for the selected filters.</p><p className="mt-2 text-sm text-muted-foreground">Try resetting the filters from the navbar.</p></div>}
      </div></div>
      <Dialog open={Boolean(selectedEvent)} onOpenChange={(open) => !open && setSelectedEvent(null)}><DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg"><DialogHeader><DialogTitle className="text-2xl font-bold tracking-tight">{selectedEvent?.title}</DialogTitle></DialogHeader>{selectedEvent && <div className="space-y-5 py-3"><img src={selectedEvent.image} alt={selectedEvent.title} className="h-52 w-full rounded-2xl object-cover" /><p className="text-sm leading-7 text-muted-foreground">{selectedEvent.description}</p><div className="grid gap-3 rounded-2xl border border-border/60 bg-muted/30 p-4 text-sm"><p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" />{selectedEvent.date}</p><p className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />{selectedEvent.time}</p><p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{selectedEvent.location}</p><p className="flex items-center gap-2"><Tag className="h-4 w-4 text-primary" />{selectedEvent.avenue}</p></div></div>}</DialogContent></Dialog>
    </>
  );
};

export default Events;
