import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Star, Trophy, Award, Users } from 'lucide-react';

const JugadorCard = ({ jugador }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={jugador.imagen || `/assets/jugadores/${jugador.chaleco}.png`} alt={jugador.apodo} />
              <AvatarFallback>{jugador.apodo[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{jugador.apodo}</CardTitle>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">#{jugador.chaleco}</Badge>
                <Badge variant="secondary">{jugador.posicion}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pierna:</span>
                <span>{jugador.pierna}</span>
              </div>
              {jugador.equipoNacional && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Selección:</span>
                  <span>{jugador.equipoNacional}</span>
                </div>
              )}
              {jugador.equipoInternacional && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Club:</span>
                  <span>{jugador.equipoInternacional}</span>
                </div>
              )}
              <div className="border-t border-gray-200 my-2" />
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-sm text-muted-foreground">Partidos</div>
                  <div className="font-bold">{jugador.partidosAcumulados}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Goles</div>
                  <div className="font-bold">{jugador.golesAcumulados}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Asistencias</div>
                  <div className="font-bold">{jugador.asistenciasAcumuladas}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{jugador.apodo}</DialogTitle>
        <DialogDescription>
          Información detallada del jugador
        </DialogDescription>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={jugador.imagen || `/assets/jugadores/${jugador.chaleco}.png`} alt={jugador.apodo} />
              <AvatarFallback>{jugador.apodo[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-bold">{jugador.apodo}</h3>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">#{jugador.chaleco}</Badge>
                <Badge variant="secondary">{jugador.posicion}</Badge>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Estadísticas</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Partidos jugados:</span>
                  <span className="font-bold">{jugador.partidosAcumulados}</span>
                </div>
                <div className="flex justify-between">
                  <span>Goles:</span>
                  <span className="font-bold">{jugador.golesAcumulados}</span>
                </div>
                <div className="flex justify-between">
                  <span>Asistencias:</span>
                  <span className="font-bold">{jugador.asistenciasAcumuladas}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Información personal</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Pierna hábil:</span>
                  <span>{jugador.pierna}</span>
                </div>
                {jugador.equipoNacional && (
                  <div className="flex justify-between">
                    <span>Selección:</span>
                    <span>{jugador.equipoNacional}</span>
                  </div>
                )}
                {jugador.equipoInternacional && (
                  <div className="flex justify-between">
                    <span>Club:</span>
                    <span>{jugador.equipoInternacional}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JugadorCard; 